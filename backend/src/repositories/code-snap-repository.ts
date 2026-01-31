import { CodeSnap } from "../models";
import type { CodeSnapInstance } from "../types";
import { CrudRepository } from "./crud-repository";

export class CodeSnapRepository extends CrudRepository<CodeSnapInstance>{
  constructor(){
    super(CodeSnap)
  }
}