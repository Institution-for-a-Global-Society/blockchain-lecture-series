// SPDX-License-Identifier: MIT
pragma solidity ^0.8.33;

/// @title Interface for `VPP` contract.
interface IVPP {
    ////////////
    // Events //
    ////////////

    /**
     * Emitted when new energy is listed with `_listingId` by `_seller`.
     */
    event EnergyListed(address indexed _seller, uint256 indexed _listingId);

    /**
     * Emitted when the energy listed with `_listingId` by `_seller` has been purchased by `_buyer`.
     */
    event EnergySold(uint256 indexed _listingId, address indexed _seller, address indexed _buyer);

    /**
     * Emitted when delivery og the energy listed with `_listingId has been confirmed.
     */
    event EnergyDeliveryConfirmed(uint256 indexed _listingId);

    ////////////
    // Errors //
    ////////////

    /**
     * Thrown if `msg.sender` is not the contract owner.
     */
    error OnlyOwner();

    /**
     * Thrown if prosumer or device has not been registered yet.
     */
    error ProsumerOrDeviceNotRegistered();

    /**
     * Thrown if listing is not found.
     */
    error ListingNotFound();

    /**
     * Thrown if listing has already been sold.
     */
    error ListingAlreadySold();

    /**
     * Thrown if listing has already been settled.
     */
    error ListingAlreadySettled();

    /**
     * Thrown if called by someone other than the registered device as a listing.
     */
    error OnlyRegisteredDevice();

    ///////////////
    // Functions //
    ///////////////

    /**
     * Registers prosumer and device.
     *
     * @dev Only callable by the contract owner.
     *
     * @param _prosumer Address of prosumer
     * @param _device Amount of prosumer's device
     */
    function register(
        address _prosumer,
        address _device
    ) external;

    /**
     * Adds the claimed energy as a new listing.
     *
     * @param _kwh kWh of energy
     * @param _price Price of energy
     * @param _device Device address that delivers energy
     */
    function list(
        uint256 _kwh,
        uint256 _price,
        address _device
    ) external;

    /**
     * Buys the energy listed with `_listingId`.
     *
     * @param _listingId Listing ID
     */
    function buy(uint256 _listingId) external;

    /**
     * Confirms delivery of the energy listed with `_listingId`.
     *
     * @dev Must be called by the registered device.
     *
     * @param _listingId Listing ID
     * @param _success True if verification succeeds, false otherwise
     */
    function confirm(
        uint256 _listingId,
        bool _success
    ) external;
}
