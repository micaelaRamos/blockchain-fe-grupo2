import axios from 'axios';

class BlockchainService {
  async getBlocks() {
    try {
      const response = await axios.get(`/blocks`);
      return response;
    } catch (error) {
      return error.response;
    }
  }

  async getBlockByHash(hash) {
    try {
      const response = await axios.get(`/blocks/${hash}`);
      return response;
    } catch (error) {
      return error.response;
    }
  }

  async createNewTransaction(transaction) {
    try {
      const response = await axios.post('/blocks/transaction', { ...transaction });
      return response;
    } catch (error) {
      return error.response;
    }
  }
}

export default new BlockchainService();