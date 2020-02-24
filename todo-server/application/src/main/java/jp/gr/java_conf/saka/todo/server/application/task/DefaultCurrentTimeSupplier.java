package jp.gr.java_conf.saka.todo.server.application.task;

import java.util.function.LongSupplier;
import javax.inject.Singleton;

@Singleton
public class DefaultCurrentTimeSupplier implements LongSupplier {

  @Override
  public long getAsLong() {
    return System.currentTimeMillis();
  }
}
