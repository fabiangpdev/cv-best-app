import { Resume, CreateResumeDTO, UpdateResumeDTO, ResumeListItem } from '@project/shared/types/resume';

export interface IResumeRepository {
  create(data: CreateResumeDTO): Promise<Resume>;
  findById(id: string): Promise<Resume | null>;
  findByUserId(userId: string): Promise<ResumeListItem[]>;
  update(id: string, data: UpdateResumeDTO): Promise<Resume>;
  delete(id: string): Promise<void>;
}