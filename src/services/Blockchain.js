import axios from 'axios';

class BlockchainService {
  async getBlocks() {
    try {
      const response = await axios.get('http://localhost:8080/blocks');
      return response;
    } catch (error) {
      return error.response;
    }
  }

  async getBlockByHash(hash) {
    try {
      const response = await axios.get(`http://localhost:8080/blocks/${hash}`, {});
      return response;
    } catch (error) {
      return error.response;
    }
  }

  async createNewTransaction(transactionData) {
    try {
      const response = await axios.post('http://localhost:8080/blocks/transaction', { ...transactionData });
      return response;
    } catch (error) {
      return error.response;
    }
  }
}

export default new BlockchainService();