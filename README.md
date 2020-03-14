# Priv Chrome-extension

**Priv** is a Chrome Extension that provides the user the ability to **categorize**, **summarize**, **understand** and **compare** Privacy Policies. It has a simple User Interface that gives the user the power to understand the critical aspect of privacy policies. They can select how much granularity they want in their summary or they can go for detailed one too.

We divided the privacy policy into **10** parts or clusters. They are as follows -
1. First PartyCollection/Use
2. Third-Party Sharing/Collection
3. User Choice Control
4. Data Security
5. International and Specific Audiences
6. User Access, Edit, and Deletion
7. Policy Change
8. Data Retention
9. Do not track
10. Others

This allows users to focus on certain topics in a proper manner. To further understand and capture the multidimensionality of the policies, we made use of **Named Entity Recognition** which was custom made for law and policies. We divided it into **4** parts -
1. Article
2. Court
3. Legality
4. Activity

Priv also allows users to compare the websites' privacy policies. For comparison, we have added Facebook's, Google's, Amazon's and Youtube's privacy policies with other websites. This allows users to compare how organizations use or collect their data.

It also provides users with Readability metrics, word count and Smog index. Smog Index is a measure of readability that estimates the years of education needed to understand a piece of writing.

## How to run it
Priv is divided into **2** parts-

* The backend can be found [**here**](https://github.com/sayak119/Priv-backend)

### Chrome Extension
* Go to `Settings` in Google Chrome. This can be found in the right hand corner where there are 3 vertical dots.
* Select `Extensions` from left hand pane.
* Click on `Load unpacked` and select the folder `Priv-extension`.
