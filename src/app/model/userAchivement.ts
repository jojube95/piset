export class UserAchivement {
    achivementId: string;
    achivementName: string;
    achivementDescription: string;
    achivementCompletePoints: number;
    currentPoints: number;

    constructor(achivementId: string, achivementName: string, achivementDescription: string, achivementCompletePoints: number, currentPoints: number) {
        this.achivementId = achivementId;
        this.achivementName = achivementName;
        this.achivementDescription = achivementDescription;
        this.achivementCompletePoints = achivementCompletePoints;
        this.currentPoints = currentPoints;
    }
}
