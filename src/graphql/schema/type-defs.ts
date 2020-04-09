export const typeDefs = `
    type Query {
        pokemonById(id: String!): Pokemon
        trainers: [Trainer]!
        pokemonsBiggerThanHp(minHp: Int!): [Pokemon]!
        trainerById(id: String!): Trainer
    }

    type Mutation {
        attackPokemon(id: String!, hpToSubtract: Int!): Boolean
        addTrainer(firstName: String!, lastName: String!, age: Int!, gender: Gender!, amountOfTournaments: Int!): Trainer
        changeTrainerFirstName(trainerId: String!, firstName: String!): Boolean
        addPokemonToTrainer(trainerId: String!, pokemonId: String!): Trainer
        deleteTrainer(trainerId: String!): Boolean
        deletePokemon(pokemonId: String!): Boolean
    }
    type Subscription {
        trainerAdded: Trainer
    }
    type Pokemon implements RepositoryEntity {
        id: String!
        deleted: Boolean!
        createdBy: String!
        creationTime: DateTime!
        lastUpdatedBy: String
        lastUpdateTime: DateTime
        realityId: Int!
        name: String
        hp: Int
        rarity: Rarity
    }
    type Trainer implements RepositoryEntity {
        id: String!
        deleted: Boolean!
        createdBy: String!
        creationTime: DateTime!
        lastUpdatedBy: String
        lastUpdateTime: DateTime
        realityId: Int!
        name: String
        age: Int
        gender: Gender
        amountOfTournaments: Int
        pokemons: [Pokemon]!
    }
    enum Rarity {
        COMMON
        RARE
        LEGENDARY
    }
    enum Gender {
        MALE
        FEMALE
    }
`;
