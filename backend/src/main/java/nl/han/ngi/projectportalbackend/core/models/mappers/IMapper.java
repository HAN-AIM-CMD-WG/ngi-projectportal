package nl.han.ngi.projectportalbackend.core.models.mappers;

import java.util.List;

public interface IMapper<F, T> {

    public T mapTo(F from);
    public T mapTo(List<F> from);
    public F mapFrom(T to);
    public F mapFrom(List<T> to);

    public List<T> mapToList(F from);
    public List<T> mapToList(List<F> from);

    public List<F> mapFromList(T to);
    public List<F> mapFromList(List<T> to);
}
