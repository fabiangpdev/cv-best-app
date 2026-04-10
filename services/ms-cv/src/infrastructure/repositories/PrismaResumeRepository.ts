import { PrismaClient } from '@prisma/client';
import { Resume, CreateResumeDTO, UpdateResumeDTO, ResumeListItem } from '../../../../shared/types/resume';
import { IResumeRepository } from '../../domain/interfaces/IResumeRepository';

export class PrismaResumeRepository implements IResumeRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async create(data: CreateResumeDTO): Promise<Resume> {
    const resume = await this.prisma.resume.create({
      data: {
        userId: data.userId,
        personalInfo: data.personalInfo as any,
        experience: data.experience as any,
        education: data.education as any,
        skills: data.skills,
        templateId: data.templateId,
      },
    });
    return this.mapToEntity(resume);
  }

  async findById(id: string): Promise<Resume | null> {
    const resume = await this.prisma.resume.findUnique({
      where: { id },
    });
    return resume ? this.mapToEntity(resume) : null;
  }

  async findByUserId(userId: string): Promise<ResumeListItem[]> {
    const resumes = await this.prisma.resume.findMany({
      where: { userId },
      select: {
        id: true,
        templateId: true,
        personalInfo: true,
        createdAt: true,
        updatedAt: true,
      },
      orderBy: { updatedAt: 'desc' },
    });

    return resumes.map((r) => ({
      id: r.id,
      templateId: r.templateId,
      personalInfo: r.personalInfo as ResumeListItem['personalInfo'],
      createdAt: r.createdAt,
      updatedAt: r.updatedAt,
    }));
  }

  async update(id: string, data: UpdateResumeDTO): Promise<Resume> {
    const updateData: any = {};
    
    if (data.personalInfo) updateData.personalInfo = data.personalInfo;
    if (data.experience) updateData.experience = data.experience;
    if (data.education) updateData.education = data.education;
    if (data.skills) updateData.skills = data.skills;
    if (data.templateId) updateData.templateId = data.templateId;

    const resume = await this.prisma.resume.update({
      where: { id },
      data: updateData,
    });
    return this.mapToEntity(resume);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.resume.delete({ where: { id } });
  }

  private mapToEntity(data: any): Resume {
    return {
      id: data.id,
      userId: data.userId,
      personalInfo: data.personalInfo as Resume['personalInfo'],
      experience: data.experience as Resume['experience'],
      education: data.education as Resume['education'],
      skills: data.skills,
      templateId: data.templateId,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    };
  }
}