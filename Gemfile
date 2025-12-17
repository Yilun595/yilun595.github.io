source "https://rubygems.org"

# GitHub Pages
gem "github-pages", group: :jekyll_plugins

# Windows specific gems
platforms :mingw, :x64_mingw, :mswin do
  #gem "wdm", "~> 0.1.0"
  gem "tzinfo", "~> 1.2"
  gem "tzinfo-data"
end

# Add webrick as it's no longer bundled with Ruby
gem "webrick"

# Your existing Jekyll plugins
group :jekyll_plugins do
  gem "jekyll-feed"
  gem "jekyll-sitemap"
  gem "hawkins"
end
gem "bigdecimal", "~> 4.0"
