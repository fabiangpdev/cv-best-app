import { IResumeRepository } from '../../domain/interfaces/IResumeRepository';

export class DeleteResumeUseCase {
  constructor(private resumeRepository: IResumeRepository) {}

  async execute(id: string): Promise<void> {
    const existing = await this.resumeRepository.findById(id);
    if (!existing) {
      throw new Error('Resume not found');
    }
    return this.resumeRepository.delete(id);
  }
}