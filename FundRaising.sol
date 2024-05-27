// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract FundRaising {
  address owner;
  struct Fund {
        string name;
        string description;
        uint256 minAmount;
        uint256 totalAmount;
        address creator;
        bool isActive;
    }
    Fund[] public funds;
    mapping(uint256 => mapping(address => uint256)) public contributions;

    event FundCreated(uint256 fundId, string name, uint256 minAmount, address creator);
    event DonationReceived(uint256 fundId, uint256 amount, address donor);
    event WithdrawalRequested(uint256 fundId, uint256 amount, address recipient);
    event FundClosed(uint256 fundId, address creator);

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can perform this action");
        _;
    }

    function createFund(string memory _name, string memory _description, uint256 _minAmount) public {
        require(bytes(_name).length > 0, "Name is required");
        require(bytes(_description).length > 0, "Description is required");
        require(_minAmount > 0, "Minimum amount should be greater than 0");

        funds.push(Fund({
            name: _name,
            description: _description,
            minAmount: _minAmount,
            totalAmount: 0,
            creator: msg.sender,
            isActive: true
        }));

        uint256 fundId = funds.length - 1;
        emit FundCreated(fundId, _name, _minAmount, msg.sender);
    }

    function donate(uint256 _fundId) public payable {
        require(_fundId < funds.length, "Fund does not exist");
        Fund storage fund = funds[_fundId];
        require(fund.isActive, "Fund is not active");
        require(msg.value >= fund.minAmount, "Donation amount is less than the minimum amount");

        fund.totalAmount += msg.value;
        contributions[_fundId][msg.sender] += msg.value;

        emit DonationReceived(_fundId, msg.value, msg.sender);
    }

    function requestWithdrawal(uint256 _fundId) public {
        require(_fundId < funds.length, "Fund does not exist");
        Fund storage fund = funds[_fundId];
        require(fund.creator == msg.sender, "Only the creator can request withdrawal");
        require(fund.totalAmount > 0, "No funds available for withdrawal");

        uint256 amount = fund.totalAmount;
        fund.totalAmount = 0;

        payable(msg.sender).transfer(amount);
        emit WithdrawalRequested(_fundId, amount, msg.sender);
    }

    function closeFund(uint256 _fundId) public {
        require(_fundId < funds.length, "Fund does not exist");
        Fund storage fund = funds[_fundId];
        require(fund.creator == msg.sender, "Only the creator can close the fund");

        if (fund.totalAmount > 0) {
            uint256 amount = fund.totalAmount;
            fund.totalAmount = 0;
            payable(msg.sender).transfer(amount);
            emit WithdrawalRequested(_fundId, amount, msg.sender);
        }

        fund.isActive = false;
        emit FundClosed(_fundId, msg.sender);
    }

    function getFundDetails(uint256 _fundId) public view returns (string memory, string memory, uint256, uint256, address, bool) {
        require(_fundId < funds.length, "Fund does not exist");
        Fund storage fund = funds[_fundId];
        return (fund.name, fund.description, fund.minAmount, fund.totalAmount, fund.creator, fund.isActive);
    }

    function getUserFunds() public view returns (uint256[] memory) {
        uint256[] memory result = new uint256[](funds.length);
        uint256 counter = 0;
        for (uint256 i = 0; i < funds.length; i++) {
            if (funds[i].creator == msg.sender && funds[i].isActive == true) {
                result[counter] = i;
                counter++;
            }
        }
        bytes memory encodedResult = abi.encode(result);
        assembly { mstore(add(encodedResult, 0x40), counter) }
        return abi.decode(encodedResult, (uint256[]));
    }

    function getFunds() public view returns (uint256[] memory) {
        uint256[] memory result = new uint256[](funds.length);
        uint256 counter = 0;
        for (uint256 i = 0; i < funds.length; i++) {
            if (funds[i].isActive == true) {
                result[counter] = i;
                counter++;
            }
        }
        bytes memory encodedResult = abi.encode(result);
        assembly { mstore(add(encodedResult, 0x40), counter) }
        return abi.decode(encodedResult, (uint256[]));
    }

    function destroyContract() public onlyOwner {
        selfdestruct(payable(owner));
    }
}
