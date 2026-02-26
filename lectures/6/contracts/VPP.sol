// SPDX-License-Identifier: MIT
pragma solidity ^0.8.33;

import { IVPP } from "./IVPP.sol";
import { IERC20 } from "./IERC20.sol";

/// @title Simple VPP (Virtual Power Plant) contract for the learning purposes.
contract VPP is IVPP {
    /////////////////////
    // State Variables //
    /////////////////////

    /// Contract address of ERC20-based stablecoin
    IERC20 public immutable STABLECOIN;

    /// Owner address
    address public immutable OWNER;

    /// Mapping from prosumer addresses to device (e.g., smart meters) addresses to the existence flags
    mapping(address => mapping(address => bool)) public devices;

    /// Struct of listable energy
    struct Listing {
        uint256 id;
        uint256 kwh;
        uint256 price;
        address seller;
        address device;
        address buyer;
        bool sold;
        bool settled;
    }

    /// Array of listings
    mapping(uint256 => Listing) public listings;

    /// Count of listings (ID = current count)
    uint256 public countOfListings;

    ///////////////
    // Modifiers //
    ///////////////

    /**
     * Checks if `msg.sender` is the contract owner.
     */
    modifier onlyOwner() {
        if (msg.sender != OWNER) {
            revert OnlyOwner();
        }
        _;
    }

    /////////////////
    // Constructor //
    /////////////////

    /**
     * Constructor of contract.
     *
     * @param _stablecoin Address of stablecoin contract used for payments
     */
    constructor(address _stablecoin) {
        STABLECOIN = IERC20(_stablecoin);
        OWNER = msg.sender;
    }

    ///////////////
    // Functions //
    ///////////////

    /// @inheritdoc IVPP
    function register(
        address _prosumer,
        address _device
    ) external onlyOwner {
        devices[_prosumer][_device] = true;
    }

    /// @inheritdoc IVPP
    function list(
        uint256 _kwh,
        uint256 _price,
        address _device
    ) external {
        if (!devices[msg.sender][_device]) {
            revert ProsumerOrDeviceNotRegistered();
        }

        listings[countOfListings] = Listing(
            countOfListings,
            _kwh,
            _price,
            msg.sender,
            _device,
            address(0),
            false,
            false
        );

        emit EnergyListed(msg.sender, countOfListings);

        countOfListings++;
    }

    /// @inheritdoc IVPP
    function buy(uint256 _listingId) external {
        Listing storage item = listings[_listingId];

        if (item.seller == address(0)) {
            revert ListingNotFound();
        }
        if (item.sold) {
            revert ListingAlreadySold();
        }

        STABLECOIN.transferFrom(msg.sender, address(this), item.price);

        item.sold = true;
        item.buyer = msg.sender;

        emit EnergySold(item.id, item.seller, msg.sender);
    }

    /// @inheritdoc IVPP
    function confirm(
        uint256 _listingId,
        bool _success
    ) external {
        Listing storage item = listings[_listingId];

        if (item.seller == address(0)) {
            revert ListingNotFound();
        }
        if (item.settled) {
            revert ListingAlreadySettled();
        }
        if (msg.sender != item.device) {
            revert OnlyRegisteredDevice();
        }

        if (_success) {
            STABLECOIN.transfer(item.seller, item.price);

            emit EnergyDeliveryConfirmed(item.id);
        } else {
            STABLECOIN.transfer(item.buyer, item.price);
        }

        item.settled = true;
    }
}
