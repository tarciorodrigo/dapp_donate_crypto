// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

struct Campaign {
    address author; // address of campaign's creator
    string title;
    string description;
    string videoUrl;
    string imageUrl;
    uint256 balance;
    bool active;
}

contract DonateCrypto {
    uint256 public fee = 100; //wei
    uint256 public nextId = 0;
    mapping (uint256 => Campaign) public campaigns; // id = campanha
    Campaign[] public allCampaigns;

    // calldata = Indica que é uma variável temporária, ou seja em mémória (somente leitura)
    // memory = Indica que é uma variável temporária, ou seja em mémória (permite escrita)
    function addCampaign(string calldata title, string calldata description, string calldata videoUrl, string calldata imageUrl) public {        
        Campaign memory newCampaign; // Instancia uma Campaign
        newCampaign.title = title;
        newCampaign.description = description;
        newCampaign.videoUrl = videoUrl;
        newCampaign.imageUrl = imageUrl;
        newCampaign.active = true;
        newCampaign.author = msg.sender; 

        nextId++;
        campaigns[nextId] = newCampaign;
    }

    function donate(uint256 id) public payable {
        require(msg.value > 0, "You must send a donation value > 0");
        require(campaigns[id].active == true, "Cannot donate to this campaign");

        campaigns[id].balance += msg.value;
    }

    function getBalance(uint256 id) public view returns (uint256) {
        return campaigns[id].balance;
    }

    function withdraw(uint256 id) public {
        Campaign memory campaign = campaigns[1];
        require(campaign.author == msg.sender, "You do not permission");
        require(campaign.active == true, "This campaign is not active");
        require(campaign.balance > 0, "This campaign does not have enough balance");

        address payable recipient = payable (campaign.author);
        recipient.call{value: campaign.balance - fee}(""); // Esse valor é retirado do balance do contrato
        //newBalance = recipient.balance - fee;
        //campaigns[id].balance = newBalance;

        campaigns[id].active = false;
    }

    // // Desafios
    // function getLastFiveCampaigns() public view returns (Campaign[] memory) {
    //     Campaign[] memory lastCampaigns = new Campaign[](5);

    //     for (uint i = 0; i < 5; i++) {     
    //         if (i <= nextId - 1)       
    //             lastCampaigns[i] = campaigns[nextId - i];
    //         else 
    //             break;
    //     }

    //     return lastCampaigns;
    // }
}