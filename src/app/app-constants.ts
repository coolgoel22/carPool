export class Constants{
    public static getCitiesOfAState(state): string[]{
        let stateNCities =  {
            "Haryana":["Faridabad", "Gurgaon", "Karnal", "Kurukshetra", "Panipat", "Rohtak", "Sonipat"],

            "Uttar Pradesh":["Noida", "Greater Noida"],
            "Delhi": ["karnal Bye-Pass", "Narela"]
        }

        return stateNCities[state];
    }
    public static getPlaces(): string[]{
        return ["Faridabad", "Gurgaon", "Karnal", "Kurukshetra", "Panipat", "Rohtak", "Sonipat", "Noida", "Greater Noida", "karnal Bye-Pass", "Narela"]
    }
    public static getStates(): string[] {
        return ["Delhi", "Haryana", "Uttar Pradesh"];
    }
}