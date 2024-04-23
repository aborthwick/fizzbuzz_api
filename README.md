# fizzbuzz_api
The intent is to demonstrate an api interface for a simple project (fizzbuzz)

To Start:

Compile local instance:
	npm install

Build docker image:
	docker build -t fb_api:0.1.0 .

Run interface from built image:
	docker run --rm --name fb1 -v $(pwd):/noderoot fb_api:0.1.0

Access api:
	curl 172.17.0.2:3000
