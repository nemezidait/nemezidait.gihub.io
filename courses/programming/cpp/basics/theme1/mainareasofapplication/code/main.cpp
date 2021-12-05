#include <algorithm>
#include <iostream>
#include <map>
#include <set>
using namespace std;
 
int main() {
	map<string, size_t> countOfWordsMap;
	for_each(istream_iterator<string>{ cin },
		 {},
		 [&countOfWordsMap](const string& word) {
			 ++countOfWordsMap[word];
		 });
 
	map<size_t, set<string>, greater<size_t>> wordsHierarchy;
	for_each(countOfWordsMap.begin(),
		 countOfWordsMap.end(),
		 [&wordsHierarchy](const pair<string, size_t>& wordInfo) { 
			 wordsHierarchy[wordInfo.second].insert(wordInfo.first);
		 });
 
	for (const auto& e : wordsHierarchy) {
		cout << e.first << ": [";
		copy(e.second.begin(), e.second.end(), ostream_iterator<string>{ cout, "; "});
		cout << "]\n";
	}
}
