import { CodeSnap } from "../models";
import { CrudRepository } from "./crud-repository";

export class CodeSnapRepository extends CrudRepository{
  constructor(){
    super(CodeSnap)
  }
}