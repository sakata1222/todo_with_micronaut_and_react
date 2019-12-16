package jp.gr.java_conf.saka.todo.server.infrastrcture.rdb.jooq.generator;

import org.jooq.codegen.DefaultGeneratorStrategy;
import org.jooq.meta.Definition;

public class JooqCustomGeneratorStrategy extends DefaultGeneratorStrategy {

  @Override
  public String getJavaClassName(Definition definition,
    Mode mode) {
    String name = super.getJavaClassName(definition, mode);
    switch (mode) {
      case DEFAULT:
        return "Jooq" + name;
      case RECORD:
        return "JooqRecord" + name;
      case POJO:
        return "Jooq" + name + "Dto";
      case INTERFACE:
        return "IJooq" + name;
      case DAO:
        return "Jooq" + name + "Dao";
      case ENUM:
        return "Jooq" + name + "Enum";
      case DOMAIN:
        return "Jooq" + name + "Domain";
    }
    return name;
  }
}
