import axios from 'axios';

class MerkleBlockService {
  async getBlocks() {
    try {
      const response = await axios.get(`http://localhost:8080/merkleblocks`);
      return response;
    } catch (error) {
      return error.response;
    }
  }

  async getBlockByHash(hash) {
    try {
      const response = await axios.get(`http://localhost:8080/merkleblocks/${hash}`);
      return response;
    } catch (error) {
      return error.response;
    }
  }

  async getPendingMerkleTransactions(hash) {
    try {
      const response = await axios.get(`http://localhost:8080/merkleblocks/${hash}`);
      return response;
    } catch (error) {
      return error.response;
    }
  }

  async createNewTransaction(transactionData) {
    try {
      const response = await axios.post('http://localhost:8080/merkleblocks/transaction', { ...transactionData });
      return response;
    } catch (error) {
      return error.response;
    }
  }
}

export default new MerkleBlockService();