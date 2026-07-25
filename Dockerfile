FROM ubuntu:18.04

# Install Node
RUN apt-get update --fix-missing && apt-get install -y apt-transport-https curl gnupg git
RUN curl -s https://deb.nodesource.com/gpgkey/nodesource.gpg.key | apt-key add -
RUN echo 'deb https://deb.nodesource.com/node_12.x bionic main' > /etc/apt/sources.list.d/nodesource.list
RUN apt-get update --fix-missing && apt-get install -y nodejs

ADD . /tm8k

WORKDIR tm8k

# Run with standard user privileges
RUN chown -R 1000:1000 /tm8k
RUN mkdir /.npm
RUN chown -R 1000:1000 /.npm
RUN mkdir /.config
RUN chown -R 1000:1000 /.config
USER 1000:1000
