FROM rust:1.60.0 as build-env

WORKDIR /usr/src/app
COPY . .

RUN cargo build

FROM gcr.io/distroless/cc
COPY --from=build-env /usr/src/app/target/debug/rust-web-mongodb-example /
CMD ["./rust-web-mongodb-example"]