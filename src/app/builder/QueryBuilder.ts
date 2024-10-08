import { Query } from "mongoose";

class QueryBuilder<T> {
  public queryModel: Query<T[], T>;
  public query: Record<string, any>

  constructor(queryModel: Query<T[], T>, query: Record<string, any>) {
    this.queryModel = queryModel
    this.query = query
  }

  search(searchAbleFields: string[]) {
    const searchTerm = this?.query?.searchTerm;
    if (this.query.searchTerm) {
      this.queryModel = this.queryModel.find({
        $or: searchAbleFields.map((field: string) => (
          {
            [field]: {
              $regex: searchTerm,
              $options: 'i',
            }
          }
        ))
      })
    }
    return this
  }

  filter(excludeFields: string[]) {
    const queryObject = { ...this.query }
    excludeFields.forEach((field) => delete queryObject[field])

    this.queryModel = this.queryModel.find(queryObject)
    return this
  }

  sort() {
    let sort = 'createdAt'
    if (this?.query?.sort) {
      sort = this?.query?.sort as string
    }
    this.queryModel = this.queryModel.sort(sort)
    return this
  }

  paginate() {
    const limit = Number(this?.query?.limit) || 10
    const page = Number(this?.query?.page) || 1
    const skip = (page - 1) * limit

    this.queryModel = this.queryModel.skip(skip).limit(limit)
    return this
  }

  selectFields() {
    const fields = (this?.query?.fields as string)?.split(',')?.join(' ') || '-__V'
    this.queryModel = this.queryModel.select(fields)

    return this
  }


}

export default QueryBuilder