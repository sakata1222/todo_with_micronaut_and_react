package jp.gr.java_conf.saka.todo.server.domain.specification;

public interface ISpecification<T> {

  boolean isSatisfiedBy(T value);
}
