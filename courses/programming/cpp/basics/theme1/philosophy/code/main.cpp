#include <iostream>
#include "QuickSort.hpp"

void PrintVector(const std::vector<int>& vec) {
    for(const auto& value : vec){
        std::cout << value << ' ';
    }
}

int main() {
    QuickSort quickSort;
    std::vector<int> sampleData{4, 2, 3, 1};
    
    std::cout << "Input: ";
    PrintVector(sampleData);
    
    std::vector<int> sortedResult = quickSort.Sort(sampleData);
    std::cout << "\nResult: ";
    PrintVector(sortedResult);
}
