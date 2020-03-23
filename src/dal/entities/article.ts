import {Column, CommonModel, Entity, ManyToOne, PrimaryGeneratedColumn} from '@enigmatis/polaris-core';
import {Author} from './author';

@Entity()
export class Article extends CommonModel {
    @Column()
    public headline: string;
    @Column()
    public text: string;
    @ManyToOne(() => Author, (author) => author.books)
    public author: Author;
    @PrimaryGeneratedColumn('uuid')
    protected id!: string;

    public constructor(headline: string, text: string, author: Author) {
        super();
        this.headline = headline;
        this.text = text;
        this.author = author;
    }

    public getId(): string {
        return this.id;
    }
}
