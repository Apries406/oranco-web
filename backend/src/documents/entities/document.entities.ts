import { Column, Entity, ManyToMany, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { v1 as uuidv1 } from "uuid";
import { User }  from "src/users/entities/user.entities";
@Entity({
  name: "documents"
})
export class Document {
  constructor() {
    this.id = uuidv1();
  }

  @PrimaryColumn({
    type: "varchar",
    length: 36,
    unique: true,
    comment: '文档ID'
  })
  id: string;

  @Column({
    type: "varchar",
    length: 255,
    comment: '文章标题',
    default: '未命名文档'
  })
  title: string;

  @Column({
    type: "text",
    comment: '文章内容',
    nullable: true
  })
  content: string;

  @Column({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
    comment: '创建时间'
  })
  createdAt: Date;

  @Column({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
    onUpdate: "CURRENT_TIMESTAMP",
    comment: "更新时间"
  })
  updatedAt: Date;

  @ManyToOne(()=> User, user=> user.documents)
  author: User;
}