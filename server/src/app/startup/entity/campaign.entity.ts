import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "campaigns" })
export class CampaignEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ type: 'varchar' })
  campaignId: string;

  @Column()
  userId: string;

  @Column({ type: 'text' })
  campaignName: string;

  @Column({ type: 'text' })
  tenure: string;

  @Column()
  investmentType: string;

  @Column()
  dealType: string;

  @Column({nullable : true})
  discount: string;

  @Column({nullable : true, type:"text"})
  description: string;

  @Column({nullable: true})
  minSubscription: string;

  @Column({nullable: true})
  target: string;

  @Column({nullable: true})
  endDate: Date;

  @Column({ nullable: true })
  docs: string;

  @Column({ nullable: true })
  returnRate: string | null;

  @Column({ type: 'text', nullable: true })
  video: string | null;

  @Column({ nullable: true })
  subscribers: string | null;

  @Column({ nullable: true })
  subscriptionDays: string | null;

  @Column({ nullable: true })
  capitalToRaise: string | null;

  @Column({ nullable: true })
  subscriptionOffered: string | null;

  @Column({ nullable: true })
  highlights: string | null;

}
