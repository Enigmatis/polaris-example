import {Column, CommonModel, Entity, OneToMany, PrimaryGeneratedColumn} from "@enigmatis/polaris-core";
import {Pokemon} from "./pokemon";
import {Gender} from "../../graphql/resolvers/enums/gender";

@Entity()
export class Trainer extends CommonModel {

    @Column()
    public firstName: string;
    @Column()
    public lastName: string;
    @Column()
    public yearsOnEarth: number;
    @Column()
    public gender: Gender;
    @Column()
    public amountOfTournaments: number;
    @OneToMany(() => Pokemon, (pokemon) => pokemon.trainer)
    public pokemons: Pokemon[];
    @PrimaryGeneratedColumn("uuid")
    private id!: string;

    public constructor(firstName: string, lastName: string, yearsOnEarth: number, gender: Gender, amountOfTournaments: number, pokemons: Pokemon[]) {
        super();
        this.firstName = firstName;
        this.lastName = lastName;
        this.yearsOnEarth = yearsOnEarth;
        this.pokemons = pokemons;
        this.gender = gender;
        this.amountOfTournaments = amountOfTournaments;
    }

    public getId(): string {
        return this.id;
    }
}
