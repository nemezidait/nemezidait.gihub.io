#include "QuickSort.hpp"
#include <utility>

std::vector<int> QuickSort::Sort(const std::vector<int>& array) const {
   std::vector<int> result(array);
   Sort(result, 0, result.size() - 1);
   return result;
}

int QuickSort::Partition(std::vector<int>& array, int low, int high) const {
    int pivot = array[high];
    int i = (low - 1);
 
    for (int j = low; j <= high- 1; j++) {
        if (array[j] <= pivot) {
            i++;
            std::swap(array[i], array[j]);
        }
    }
    std::swap(array[i + 1], array[high]);
    return (i + 1);
}

void QuickSort::Sort(std::vector<int>& array, int beginIndex, int endIndex) const {
    if (beginIndex < endIndex) {
        int partitionIndex = Partition(array, beginIndex, endIndex);
        
        Sort(array, beginIndex, partitionIndex - 1);
        Sort(array, partitionIndex + 1, endIndex);
    }
}
