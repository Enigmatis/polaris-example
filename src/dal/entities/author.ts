import {Column, CommonModel, Entity, OneToMany, PrimaryGeneratedColumn} from '@enigmatis/polaris-core';
import {Book} from './book';

@Entity()
export class Author extends CommonModel {
    @Column()
    public firstName: string;
    @Column()
    public lastName: string;
    @OneToMany(() => Book, (book) => book.author)
    public books: Book[];
    @PrimaryGeneratedColumn('uuid')
    protected id!: string;

    public constructor(firstName: string, lastName: string, books: Book[]) {
        super();
        this.firstName = firstName;
        this.lastName = lastName;
        this.books = books;
    }

    public getId(): string {
        return this.id;
    }
}
