import { Document } from "src/documents/entities/document.entities";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({
  name: "users"
})
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: "varchar",
    length: '50',
    unique: true,
    comment: '用户名'
  })
  username: string;

   @Column({
    type: "varchar",
    length: '50',
    unique: true,
    comment: '用户名(拼音)'
  })
  username_pinyin: string;

  @Column({
    type: "varchar",
    length: '10',
    comment: '用户名后缀',
  })
  username_suffix: string;

  @Column({
    type: "varchar",
    length: '50',
    comment: '邮箱前缀'
  })
  email_prefix: string;
  
  @Column({
    length: '50',
    comment: '密码'
  })
  password: string;

  @Column({
    comment: "头像",
    default: 'default.jpg'
  })
  avatar: string;

  @Column({
    length: 50,
    comment: "邮箱"
  })
  email: string;

  @Column({
    length: 10,
    comment: "年级"
  })
  grade: string;


  @OneToMany(() => Document, document => document.author)
  documents: Document[];
}