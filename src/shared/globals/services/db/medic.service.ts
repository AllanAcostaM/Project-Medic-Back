import { IMedicDocument } from '@root/features/medic/interfaces/medicDocument.interface';
import { MedicModel } from '@root/features/medic/models/medic.schema';
import mongoose from 'mongoose';

class MedicService {
  public async addUMedicData(data: IMedicDocument): Promise<void> {
    await MedicModel.create(data);
  }

  public async getMedciById(medicId: string): Promise<IMedicDocument> {
    const medics: IMedicDocument[] = await MedicModel.aggregate([
      { $match: { _id: new mongoose.Types.ObjectId(medicId) } },
      { $lookup: { from: 'Auth', localField: 'authId', foreignField: '_id', as: 'authId' } },
      { $unwind: '$authId' },
      { $project: this.aggregateProject() }
    ]);
    return medics[0];
  }

  private aggregateProject() {
    return {
      _id: 1,
      username: '$authId.username',
      specialty: '$authId.specialty',
      createdAt: '$authId.createdAt',
      school: 1,
      phoneNumber: 1,
      location: 1
    };
  }
}

export const medicService: MedicService = new MedicService();
