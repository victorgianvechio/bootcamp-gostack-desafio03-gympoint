/* eslint-disable class-methods-use-this */

import Checkin from '../models/Checkin';
import Student from '../models/Student';

class CheckinController {
  async store(req, res) {
    const existStudent = await Student.findByPk(req.params.id);

    if (!existStudent) {
      return res.status(401).json({ error: 'Student not Found' });
    }

    const checkin = await Checkin.create({ student_id: req.params.id });

    return res.json(checkin);
  }

  async index(req, res) {
    const existStudent = await Student.findByPk(req.params.id);

    if (!existStudent) {
      return res.status(401).json({ error: 'Student not Found' });
    }

    const checkins = await Checkin.findAll({
      where: { student_id: req.params.id },
      attributes: ['created_at'],
      order: ['created_at'],
    });

    return res.json(checkins);
  }
}

export default new CheckinController();
