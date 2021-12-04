#include <vector>

class QuickSort final {
public:
    std::vector<int> Sort(const std::vector<int>& array) const;
private:
    void Sort(std::vector<int>& array, int beginIndex, int endIndex) const;
    int Partition(std::vector<int>& array, int low, int high) const;
};
