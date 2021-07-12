import axios from 'axios';

class BlockchainService {
  async getBlocks() {
    try {
      const response = await axios.get('http://localhost:8080/blocks');
      return response;
    } catch (error) {
      throw error;
    }
  }

  async getBlockByHash(hash) {
    try {
      const response = await axios.get(`http://localhost:8080/blocks/${hash}`, {});
      return response;
    } catch (error) {
      throw error;
    }
  }

  async createNewTransaction(transactionData) {
    try {
      const response = await axios.post('http://localhost:8080/blocks/transaction', { ...transactionData });
      return response;
    } catch (error) {
      throw error;
    }
  }
}

export default new BlockchainService();