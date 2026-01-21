import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Agent } from '../db/entities/agent.entity';
import { DataSource, FindOneOptions, Repository } from 'typeorm';
import { CreateAgentDto } from './dto/create-agent.dto';
import { dataResponse, DataResponseDTO } from '../common/dto/data-response.dto';
import { _400 } from '../common/constants/error-messages';
import { Portfolio } from '../db/entities/portfolio.entity';
import { generateRandomText } from '../common/lib/auth';
import { EmailsService } from '../emails/emails.service';

@Injectable()
export class AgentService {
  constructor(
    @InjectRepository(Agent) private agentRepository: Repository<Agent>,
    @InjectRepository(Portfolio)
    private portfolioRepository: Repository<Portfolio>,
    private dataSource: DataSource,
    private mailService: EmailsService,
  ) {}

  async checkAgentWithEmail(email: string) {
    const agentExists = await this.agentRepository.findOne({
      where: {
        email,
      },
    });

    if (agentExists) throw new BadRequestException(_400.EMAIL_EXISTS);

    return agentExists;
  }

  async findOneWithOptions(options: FindOneOptions) {
    const agent = await this.agentRepository.findOne(options);
    return agent;
  }

  /**
   *
   * @param dto
   * @param portfolioID
   * @returns newly created agent.
   */

  async create(
    dto: CreateAgentDto,
    portfolioID: number,
  ): Promise<DataResponseDTO> {
    const { email, firstName, lastName } = dto;

    const agent = await this.dataSource.transaction(async (manager) => {
      await this.checkAgentWithEmail(email);

      // get portfolio using the portfolio ID

      const portfolio = await this.portfolioRepository.findOne({
        where: {
          id: portfolioID,
        },
      });

      if (!portfolio) throw new BadRequestException();

      // create a new agent.

      const password = await generateRandomText(8);

      const agent = await this.agentRepository.create({
        email,
        firstName,
        lastName,
        portfolio,
        password,
      });

      // TODO: invoke the notification service here and send an email.

      this.mailService.sendPassword(email, password);

      await this.agentRepository.save(agent);
    });
    return dataResponse(agent, 'Agent added to the portfolio successfully');
  }
}
