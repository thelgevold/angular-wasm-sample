workspace(name = "friends", managed_directories = {"@npm": ["node_modules"]},)

load("@bazel_tools//tools/build_defs/repo:http.bzl", "http_archive")

http_archive(
    name = "io_bazel_rules_sass",
    sha256 = "77e241148f26d5dbb98f96fe0029d8f221c6cb75edbb83e781e08ac7f5322c5f",
    strip_prefix = "rules_sass-1.24.0",
    urls = [
        "https://github.com/bazelbuild/rules_sass/archive/1.24.0.zip",
        "https://mirror.bazel.build/github.com/bazelbuild/rules_sass/archive/1.24.0.zip",
    ],
)

http_archive(
    name = "build_bazel_rules_nodejs",
    sha256 = "d14076339deb08e5460c221fae5c5e9605d2ef4848eee1f0c81c9ffdc1ab31c1",
    urls = ["https://github.com/bazelbuild/rules_nodejs/releases/download/1.6.1/rules_nodejs-1.6.1.tar.gz"],
)

load("@build_bazel_rules_nodejs//:index.bzl", "yarn_install")

yarn_install(
    name = "npm",
    package_json = "//:package.json",
    yarn_lock = "//:yarn.lock",
)

load("@npm//:install_bazel_dependencies.bzl", "install_bazel_dependencies")

install_bazel_dependencies()

load("@npm_bazel_typescript//:index.bzl", "ts_setup_workspace")

ts_setup_workspace()

load("@io_bazel_rules_sass//sass:sass_repositories.bzl", "sass_repositories")

sass_repositories()