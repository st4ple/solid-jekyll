# How to develop this site locally??

1. Use [this](https://jekyllrb.com/docs/installation/windows/) link, follow the instructions and install stuffs.
2. Open cmd and run `gem install bundler`.
3. Open the directory of the project and run `bundle install`.
4. Run `bundle exec jekyll serve`
5. Install additional gems if error occurs. I executed `gem install faraday-retry` and `bundle add webrick`

# Adding new members
1. Add your picture in one of the appropriate directory of `assets/img/members`.

2. Add the description in the `_config.yml` file. You will find grad and undergrad students. Follow the style and add yours. the `team.html` uses these lists of `_config.yml` and render the member list in the UI. 
  ```
    - name: "Your name"
      position: "Your position"
      img: "Name of the image you have saved in step 1 with extension, e.g., png, jpg"
      details_link: "Name of your personal file without the extension. This file will be created in step-3"
  ```

3. In the folder `_team_members` add your personal page in the appropriate directory, e.g. graduate, undergrad. Copy this [template]("https://github.com/PERSUE-Lab-ASU/persue-lab-asu.github.io/blob/master/_team_members/template-for-new-member.markdown"), rename and update with your information.

This is a modified verion of **Solid. A Bootstrap theme for Jekyll**


