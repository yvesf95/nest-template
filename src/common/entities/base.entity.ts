export abstract class BaseEntity {
  readonly id: string;
  createdDate = new Date();
  lastUpdatedDate?: Date;
  version = 1;

  /**
   * Checks if the current entity is equal to the provided object.
   * Two entities are equal if they have the same identifier.
   * @param obj - the object to compare with.
   * @returns true if the objects are equal, false otherwise.
   */
  equals(obj?: BaseEntity): boolean {
    // If the object is null or undefined, then it's not equal.
    if (obj == null || obj == undefined) {
      return false;
    }

    // If the current entity is the same as the provided object, then they are equal.
    if (this === obj) {
      return true;
    }

    // If the provided object is not an instance of Entity, then they are not equal.
    if (!(obj instanceof BaseEntity)) {
      return false;
    }

    // Finally, compare the identifiers of the two entities. If they are equal, then the entities are equal.
    return this.id === obj.id;
  }
}
