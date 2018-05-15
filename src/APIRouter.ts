import { Router, Request, Response, NextFunction } from 'express';


export class APIRouter {
	router: Router

  /**
   * Initialize the HeroRouter
   */
	constructor() {
		this.router = Router();
		this.init();
	}

  /**
   * GET all Heroes.
   */
	public getToken(req: Request, res: Response, next: NextFunction) {
		res.json({
			myToken: "e4ea52d3-32ee-4947-bca2-4213ce5b09eb"
		});
	}

	public getReverseWords(req: Request, res: Response, next: NextFunction) {
		let sentence = req.query.sentence as string;
		let splitted = sentence.split(" ", 100); 
		
		var reversedWordsArray: string[] = new Array(splitted.length);

		let count = 0;
		for (let word of splitted) {
			reversedWordsArray[count++] = APIRouter.splitLettersAndReverse(word);
		}

		let result = reversedWordsArray.join(" ");

		//res.json({
		//	ReverseWord: result
		//});

		res.json(result);
	}

	
	static splitLettersAndReverse(word: string): string {
		return (word.split("").reverse().join(""));
	}


	public getFibonacci(req: Request, res: Response, next: NextFunction) {
		let number = req.query.n;

		let result = "The request is invalid.";

		if (!(isNaN(number))) {
			result = APIRouter.fibNumber(Math.abs(number)).toString();
		}

		res.json(result);
	}

	static fibNumber(num: number): number {
		if (num == 0) {
			return 0;
		}
		else {
			if (num == 1 || num == 2) {
				return 1;
			}
			else {
				return APIRouter.fibNumber(num - 1) + APIRouter.fibNumber(num - 2);
			}
		}
	}

	public getTriangleType(req: Request, res: Response, next: NextFunction) {
		let result = "The request is invalid.";

		if (!(isNaN(req.query.a) || isNaN(req.query.b) || isNaN(req.query.c)))
		{
			let a = req.query.a as number;
			let b = req.query.b as number;
			let c = req.query.c as number;

			var twosides = +a + +b;
			if (twosides <= c) {
				result = "Error.";
			}
			else {
				if (a == b && b == c) {
					result = "Equilateral";
				}
				else if (a == b || b == c || a == c) {
					result = "Isosceles";
				}
				else {
					result = "Scalene";
				}
			}
		}

		res.json(result);
	}

  /**
   * Take each handler, and attach to one of the Express.Router's
   * endpoints.
   */
	init() {
		this.router.get('/Token', this.getToken);
		this.router.get('/ReverseWords', this.getReverseWords);
		this.router.get('/Fibonacci', this.getFibonacci);
		this.router.get('/TriangleType', this.getTriangleType);
	}

}

// Create the HeroRouter, and export its configured Express.Router
const apiRoutes = new APIRouter();
apiRoutes.init();

export default apiRoutes.router;