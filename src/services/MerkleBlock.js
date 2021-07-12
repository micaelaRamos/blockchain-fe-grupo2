import axios from 'axios';

class MerkleBlockService {
  async getBlocks() {
    try {
      const response = await axios.get(`http://localhost:8080/merkleblocks`);
      return response;
    } catch (error) {
      throw error;
    }
  }

  async getBlockByHash(hash) {
    try {
      const response = await axios.get(`http://localhost:8080/merkleblocks/${hash}`);
      return response;
    } catch (error) {
      throw error;
    }
  }

  async getPendingMerkleTransactions() {
    try {
      const response = await axios.get(`http://localhost:8080/merkleblocks/transaction`);
      return response;
    } catch (error) {
      throw error;
    }
  }

  async createNewTransaction(transactionData) {
    try {
      const response = await axios.post('http://localhost:8080/merkleblocks/transaction', { ...transactionData });
      return response;
    } catch (error) {
      throw error;
    }
  }
}

export default new MerkleBlockService();