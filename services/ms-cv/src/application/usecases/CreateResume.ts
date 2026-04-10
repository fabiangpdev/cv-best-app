import { Resume, CreateResumeDTO } from '@project/shared/types/resume';
import { IResumeRepository } from '../../domain/interfaces/IResumeRepository';

export class CreateResumeUseCase {
  constructor(private resumeRepository: IResumeRepository) {}

  async execute(data: CreateResumeDTO): Promise<Resume> {
    if (!data.userId) {
      throw new Error('User ID is required');
    }
    if (!data.personalInfo?.name || !data.personalInfo?.email) {
      throw new Error('Name and email are required');
    }
    return this.resumeRepository.create(data);
  }
}