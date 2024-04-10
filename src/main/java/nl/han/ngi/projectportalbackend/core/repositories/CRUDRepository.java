package nl.han.ngi.projectportalbackend.core.repositories;

import java.util.List;

public interface CRUDRepository<K, T> {

    public List<T> getAll();
    public T get(K key);
    public T create(T data);
    public T update(K key, T data);
    public T delete(K key);
}
