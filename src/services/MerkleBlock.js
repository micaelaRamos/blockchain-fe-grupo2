import axios from 'axios';

class MerkleBlockService {
  async getBlocks() {
    try {
      const response = await axios.get(`/merkleblocks`);
      return response;
    } catch (error) {
      return error.response;
    }
  }

  async getBlockByHash(hash) {
    try {
      const response = await axios.get(`/merkleblocks/${hash}`);
      return response;
    } catch (error) {
      return error.response;
    }
  }

  async getPendingMerkleTransactions(hash) {
    try {
      const response = await axios.get(`/merkleblocks/${hash}`);
      return response;
    } catch (error) {
      return error.response;
    }
  }

  async createNewTransaction(transaction) {
    try {
      const response = await axios.post('/merkleblocks/transaction', { ...transaction });
      return response;
    } catch (error) {
      return error.response;
    }
  }
}

export default new MerkleBlockService();