class sampleController {
  static async getOne(req, res) {
    res.ok('getOne ok');
  }

  static async getList(req, res) {
    res.ok('getList ok');
  }

  static async getCount(req, res) {
    res.ok('getCount ok');
  }

  static async createOne(req, res) {
    res.ok('createOne ok');
  }

  static async updateOne(req, res) {
    res.ok('updateOne ok');
  }

  static async deleteOne(req, res) {
    res.ok('deleteOne ok');
  }
}

module.exports = sampleController;
