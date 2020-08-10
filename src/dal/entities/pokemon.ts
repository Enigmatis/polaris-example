import {Column, CommonModel, Entity, ManyToOne, PrimaryGeneratedColumn} from "@enigmatis/polaris-core";
import {Trainer} from "./trainer";

@Entity()
export class Pokemon extends CommonModel {

    @PrimaryGeneratedColumn("uuid")
    public id!: string;

    @Column()
    public name: string;

    @Column()
    public hp: number;

    @Column()
    public percentageOfCatching: number;

    @ManyToOne(() => Trainer, (trainer) => trainer.pokemons, {nullable: true, onDelete: "SET NULL"})
    public trainer?: Trainer;

    public constructor(name: string, hp: number, percentageOfCatching: number, trainer?: Trainer) {
        super();
        this.name = name;
        this.hp = hp;
        this.percentageOfCatching = percentageOfCatching;
        this.trainer = trainer;
    }

    public getId(): string {
        return this.id;
    }
}
