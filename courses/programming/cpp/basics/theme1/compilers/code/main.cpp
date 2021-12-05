#include <iostream>
 
/*
 * Этот код показывает разницу между различными компиляторами:
 * на MinGW он работает, т.к. MinGW расширяет стандарт C++ таким поведением,
 * а вот msvc (msvcpp) даёт ошибку компиляции.
 */
int main()
{
    int length;
    std::cin >> length;
    int array[length];
}
