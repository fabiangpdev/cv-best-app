import { Resume, UpdateResumeDTO } from '@project/shared/types/resume';
import { IResumeRepository } from '../../domain/interfaces/IResumeRepository';

export class UpdateResumeUseCase {
  constructor(private resumeRepository: IResumeRepository) {}

  async execute(id: string, data: UpdateResumeDTO): Promise<Resume> {
    const existing = await this.resumeRepository.findById(id);
    if (!existing) {
      throw new Error('Resume not found');
    }
    return this.resumeRepository.update(id, data);
  }
}