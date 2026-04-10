import { Resume, ResumeListItem } from '../../../../shared/types/resume';
import { IResumeRepository } from '../../domain/interfaces/IResumeRepository';

export class GetResumeUseCase {
  constructor(private resumeRepository: IResumeRepository) {}

  async execute(id: string): Promise<Resume | null> {
    return this.resumeRepository.findById(id);
  }

  async getByUserId(userId: string): Promise<ResumeListItem[]> {
    return this.resumeRepository.findByUserId(userId);
  }
}