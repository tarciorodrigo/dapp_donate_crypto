import ABI from "./ABI.json";
import Web3 from "web3";

const CONTRACT_ADDRESS = "0x7706575410E75A7F09569E705268b5261A7830ad";

export async function doLogin(){
    if(!window.ethereum) throw new Error("Carteira crypto não encontrada!");

    // Configura a conexão a wallet
    const web3 = new Web3(window.ethereum);
    const accounts = await web3.eth.requestAccounts();
    if(!accounts || !accounts.length) throw new Error("Carteira não encontrada/autorizada");
    // Salva no storage do navegador o valor do primeiro endereço da wallet
    localStorage.setItem("wallet", accounts[0]);
    return accounts[0];
}

function getContract(){
    const web3 = new Web3(window.ethereum);
    const from = localStorage.getItem("wallet");
    // Conecta com o smart contract
    return new web3.eth.Contract(ABI, CONTRACT_ADDRESS, { from });
}

export async function addCampaign(campaign){
    const contract = getContract();
    // Cria uma nova campanha dentro do smart contract
    return contract.methods.addCampaign(campaign.title, campaign.description, campaign.videoUrl, campaign.imageUrl).send();
}

export async function getLastCampaignId(){
    const contract = getContract();
    return contract.methods.nextId().call();
}

export async function getCampaign(id){
    const contract = getContract();
    return contract.methods.campaigns(id).call();
}

export async function donate(id, donation){
    await doLogin();
    const contract = getContract();
    return contract.methods.donate(id).send({
        value: Web3.utils.toWei(donation, "ether")
    })
}